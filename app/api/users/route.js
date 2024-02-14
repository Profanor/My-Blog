export async function GET(request) {
    const users = [
        { id: 1, name: "john" },
        { id: 2, name: "david" },
        { id: 3, name: "clare" }
    ];

    //send the users as a response
    return new Response(JSON.stringify(users))
}