import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";
const server = new McpServer({
    name: "rest-server",
    version: "1.0.0",
});
server.tool("generateToken", "authenticate_User", {
    baseURL: z.string().describe("Base URL for the REST API"),
    endpoint: z.string().describe("Endpoint for authentication"),
    username: z.string().describe("username for authentication"),
    password: z.string().describe("password for authentication"),
}, async ({ baseURL, endpoint, username, password }) => {
    try {
        const response = await axios.post(`${baseURL}/${endpoint}`, { username, password }, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return {
            content: [{ type: "text", text: `Token Generated: ${response.data.token}` }],
        };
    }
    catch (error) {
        console.error("Error generating token:", error);
        return {
            content: [{ type: "text", text: `Error: Unable to generate token` }],
        };
    }
});
server.tool("fetchData", "get_Data", {
    baseURL: z.string().describe("Base URL for the REST API"),
    endpoint: z.string().describe("Endpoint to fetch data from"),
    params: z.record(z.string()).optional().describe("Query parameters for the request"),
}, async ({ baseURL, endpoint, params }) => {
    try {
        const response = await axios.get(`${baseURL}/${endpoint}`, {
            params: params || {}, // Include query parameters if provided
        });
        return {
            content: [{ type: "text", text: `Data fetched: ${JSON.stringify(response.data, null, 2)}` }],
        };
    }
    catch (error) {
        console.error("Error fetching data:", error);
        return {
            content: [{ type: "text", text: `Error: Unable to fetch data` }],
        };
    }
});
server.tool("postrequest", "create_data", {
    baseURL: z.string().describe("Base URL for the REST API"),
    endpoint: z.string().describe("Endpoint to post data to"),
    payload: z.string().describe("Payload to send in the POST request"),
}, async ({ baseURL, endpoint, payload }) => {
    try {
        const data = JSON.parse(payload);
        const response = await axios.post(`${baseURL}/${endpoint}`, data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Content-Length": JSON.stringify(data).length.toString(),
                "Host": "restful-booker.herokuapp.com"
                //   "Cookie": `${token}`, // Pass token in Authorization header
            },
        });
        //   console.log("Response:", response);
        return {
            content: [{ type: "text", text: `Resource successfully created: ${JSON.stringify(response.data)}` }],
        };
    }
    catch (error) {
        console.error("Error creating booking:", error);
        return {
            content: [{ type: "text", text: `Error: Unable to create resource ` }],
        };
    }
});
server.tool("put_request", "update_data", {
    baseURL: z.string().describe("Base URL for the REST API"),
    endpoint: z.string().describe("Endpoint to update data at (e.g., /booking/:id)"),
    token: z.string().describe("Authentication token"),
    payload: z.string().describe("Data to update in the PUT request body"),
}, async ({ baseURL, endpoint, token, payload }) => {
    try {
        const data = JSON.parse(payload);
        const response = await axios.put(`${baseURL}/${endpoint}`, data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Content-Length": JSON.stringify(data).length.toString(),
                "Host": "restful-booker.herokuapp.com",
                "Cookie": `token=${token}`, // Pass token in Authorization header
            },
        });
        return {
            content: [{ type: "text", text: `Booking successfully updated: ${JSON.stringify(response.data, null, 2)}` }],
        };
    }
    catch (error) {
        console.error("Error updating booking:", error);
        return {
            content: [{ type: "text", text: `Error: Unable to update booking.` }],
        };
    }
});
server.tool("patch_request", "partial_update_data", {
    baseURL: z.string().describe("Base URL for the REST API"),
    endpoint: z.string().describe("Endpoint to update data at (e.g., /booking/:id)"),
    token: z.string().describe("Authentication token"),
    payload: z.string().describe("Data to update in the Patch request body"),
}, async ({ baseURL, endpoint, token, payload }) => {
    try {
        const data = JSON.parse(payload);
        const response = await axios.patch(`${baseURL}/${endpoint}`, data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Content-Length": JSON.stringify(data).length.toString(),
                "Host": "restful-booker.herokuapp.com",
                "Cookie": `token=${token}`, // Pass token in Authorization header
            },
        });
        return {
            content: [{ type: "text", text: `Booking successfully updated: ${JSON.stringify(response.data, null, 2)}` }],
        };
    }
    catch (error) {
        console.error("Error updating booking:", error);
        return {
            content: [{ type: "text", text: `Error: Unable to update booking.` }],
        };
    }
});
server.tool("delete_request", "delete_Data", {
    baseURL: z.string().describe("Base URL for the REST API"),
    endpoint: z.string().describe("Endpoint to delete data at (e.g., /booking/:id)"),
    token: z.string().describe("Authentication token"),
}, async ({ baseURL, endpoint, token }) => {
    try {
        const response = await axios.delete(`${baseURL}/${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Host": "restful-booker.herokuapp.com",
                "Cookie": `token=${token}`, // Pass token in Authorization header
            },
        });
        return {
            content: [{ type: "text", text: `Booking successfully deleted: ${JSON.stringify(response.data, null, 2)}` }],
        };
    }
    catch (error) {
        console.error("Error deleting booking:", error);
        return {
            content: [{ type: "text", text: `Error: Unable to delete booking.` }],
        };
    }
});
/////////////////////////////////////////////////////////////////////////////////
// MAIN FUNCTION
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("REST API MCP Server for full CRUD operations with authentication running on stdio");
}
// Catch initialization errors
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
