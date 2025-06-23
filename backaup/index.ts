import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from 'axios';

const server = new McpServer({
  name: "rest-server",
  version: "1.0.0",
});


server.tool(
    "fetchData",
    "get_Data",
    {
     "baseURL": z.string().describe("Base URL for the REST API"),
     "endpoint": z.string().describe("Endpoint to fetch data from"),
    "params": z.record(z.string()).optional().describe("Query parameters for the request"),

    },
    async ({ baseURL, endpoint }) => {
      try {
        const response = await axios.get(`${baseURL}/${endpoint}`);
        
       
        return {
                content: [{ type: 'text', text: `Data fetched: ${JSON.stringify(response.data, null, 2)}`}]
            };
    
      } catch (error) {
        console.error("Error fetching data:", error);
       return {
                content: [{ type: 'text', text: `Error fetching data`}]
            };


      }
    }
)


server.tool(
    "create_Token",
    "Authenticate",
    {
    "baseURL": z.string().describe("Base URL for the REST API"),
     "username": z.string().describe("username for authentication"),
     "password": z.string().describe("password for authentication"),
     "endpoint": z.string().describe("Endpoint to fetch data from")

    },
    async ({ username, password, baseURL,endpoint }) => {
      try {
        const response = await axios.post(
      `${baseURL}/${endpoint}`,
      { username, password }, // Payload as JSON
      {
        headers: {
          'Content-Type': 'application/json', // Specify content type
        },
      }
    );
    // state.token = response.data.token; // Assuming the token is in the response data

     return {
                content: [{ type: 'text', text: `Token Generated: ${response.data.token}`}]
            };
      } catch (error) {
        console.error("Error Generating token:", error);

      return {
                content: [{ type: 'text', text: `Error Generating token`}]
            };


      }
    }
)



async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("REST API MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});

