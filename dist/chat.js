(async () => {
// DSChatSDK construction accepts two parameters:
// 1. Chat Room Id
// 2. ID of the iFrame tag
// 3. Dead Simple Chat Public API Key.
    const sdk = new DSChatSDK("o1J4btZoe", "chat-frame", "pub_43666f655169444a326862686262526c653656464d414f683143624a593948316a566e6d575064595967576e7951576e")
// Call the connect method to connect the SDK to the Chat iFrame.
    await sdk.connect();
})();

/**
 * Listening to Message Event.
 * This is triggered Each Time a message arrives in the chat room
 */
sdk.on("message", (message) => {
    console.log("New Message Arrived", message);
});

/**
 * Calling the Join Method to Join the Chat Room
 */
sdk.join({
    uniqueUserIdentifier: "10001"
});

/**
 * Sending a message in the chat room.
 */
sdk.sendMessage("Hello World");
