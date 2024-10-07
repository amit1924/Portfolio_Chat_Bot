import React, { useState, useEffect, useRef } from "react";
import { marked } from "marked";

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const [res, setRes] = useState(true);

  // Define portfolio-related responses with regex patterns
  const portfolioResponses = [
    {
      regex: /boss|owner/i,
      response: "My boss is Amit",
    },
    {
      regex: /what is your name/i,
      response: `<div style="font-family: Arial, sans-serif; text-align: center; margin: 20px;">
      <h2 style="margin-bottom: 10px; color: #333;"></h2>
      <p style="font-size: 18px; color: #555;">
        I am <strong>Amit Kumar</strong>, a full-stack developer skilled in 
        <strong style="color: #61DAFB;">React</strong>, 
        <strong style="color: #68B639;">Node.js</strong>, 
        <strong style="color: #000000;">Express</strong>, 
        <strong style="color: #4DB33D;">MongoDB</strong>, and more.
      </p>
    </div>`,
    },
    {
      regex: /what do you do/i,
      response:
        "I am a full-stack developer skilled in React, Node.js, Express, MongoDB, and more.",
    },
    {
      regex: /skills|technologies/i,
      response: `
  
   <div style="font-family: Arial, sans-serif; text-align: center; margin: 20px 0;">
      <h2 style="margin-bottom: 20px; color: #333;">Technologies I Work With</h2>
      <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 20px;">
        <div style="flex: 1 1 200px; max-width: 250px;">
          <img src="https://www.patterns.dev/img/reactjs/react-logo@3x.svg" alt="React" style="width: 100%; height: auto; object-fit: cover; border-radius: 10px;" />
        </div>
        <div style="flex: 1 1 200px; max-width: 250px;">
          <img src="https://www.openlogic.com/sites/default/files/image/2021-06/image-blog-openlogic-what-is-mongodb.png" alt="MongoDB" style="width: 100%; height: auto; object-fit: cover; border-radius: 10px;" />
        </div>
        <div style="flex: 1 1 200px; max-width: 250px;">
          <img src="https://miro.medium.com/v2/resize:fit:1400/0*9ToWmeRH2_mgrDss" alt="Node.js" style="width: 100%; height: auto; object-fit: cover; border-radius: 10px;" />
        </div>
        <div style="flex: 1 1 200px; max-width: 250px;">
          <img src="https://miro.medium.com/v2/resize:fit:960/1*OlyP02fRFe8pEkJgb6vGTQ.png" alt="Express" style="width: 100%; height: auto; object-fit: cover; border-radius: 10px;" />
        </div>
      </div>
    </div>
`,
    },
    {
      regex: /experience/i,
      response: `experince:
          <div style="font-family: Arial, sans-serif; color: #333;">
            While I may not have formal experience, I am <strong>passionate about learning</strong> and have worked on several personal projects to develop my skills. 
            I'm eager to apply my knowledge in <strong>real-world scenarios</strong>.
          </div>
        `,
    },

    {
      regex: /projects?|work/i,
      response: `I have worked on various projects including chat applications, music streaming websites, virtual assistants, and e-commerce websites. You can check them out......
      <div style="font-family: Arial, sans-serif; text-align: center;">
      <h2 style="margin-bottom: 20px; color: #333;">Projects I've Worked On</h2>
      <p style="margin-bottom: 20px; color: #555;">
        I have worked on various projects including chat applications, music streaming websites, virtual assistants, and e-commerce websites. You can check them out:
      </p>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <a href="https://image-generator-frontend-plum.vercel.app" class="text-red-400 hover:underline" target="_blank" style="color: #e63946; text-decoration: none; transition: color 0.3s;">
          AI Image Generator
        </a>
        <a href="https://digital-ecommerce-frontend.vercel.app" class="text-red-400 hover:underline" target="_blank" style="color: #e63946; text-decoration: none; transition: color 0.3s;">
          E-commerce
        </a>
        <a href="https://my-new-portfolio-ecru.vercel.app" class="text-red-400 hover:underline" target="_blank" style="color: #e63946; text-decoration: none; transition: color 0.3s;">
          My Portfolio
        </a>
        <a href="https://ai-app-swart-zeta.vercel.app" class="text-red-400 hover:underline" target="_blank" style="color: #e63946; text-decoration: none; transition: color 0.3s;">
          Virtual Assistant
        </a>
      </div>
    </div>
      
      
      
        `,
    },
    {
      regex: /about me/i,
      response:
        "I am Amit Kumar, a passionate full-stack developer. You can contact me at amit192400@gmail.com for any inquiries.",
    },
    {
      regex: /contact/i,
      response: `you can contact me :
    <div style="text-align: center; font-family: Arial, sans-serif;">
      <h2 style="margin-bottom: 20px; color: #333;">You can contact me:</h2>
      <div style="display: flex; justify-content: center; gap: 20px;">
        <a href="https://web.whatsapp.com/" target="_blank" aria-label="WhatsApp">
          <img src="https://cdn.pixabay.com/photo/2017/02/16/12/04/whatsapp-2071331_1280.png" alt="WhatsApp" style="width: 100px; height: 100px; object-fit: cover; transition: transform 0.3s;"/>
        </a>
        <a href="https://github.com/amit1924?tab=repositories" target="_blank" aria-label="GitHub">
          <img src="https://cdn.pixabay.com/photo/2017/08/05/11/24/logo-2582757_1280.png" alt="GitHub" style="width: 100px; height: 100px; object-fit: cover; transition: transform 0.3s;"/>
        </a>
        <a href="https://mail.google.com/" target="_blank" aria-label="Email">
          <img src="https://cdn.pixabay.com/photo/2013/07/12/15/53/email-150497_1280.png" alt="Email" style="width: 100px; height: 100px; object-fit: cover; transition: transform 0.3s;"/>
        </a>
        <a href="#" target="_blank" aria-label="Contact Number">
          <img src="https://cdn.pixabay.com/photo/2016/02/07/14/45/smartphone-1184883_1280.png" alt="Contact" style="width: 100px; height: 100px; object-fit: cover; transition: transform 0.3s;"/>
        </a>
      </div>
      <p style="margin-top: 10px; color: #666;">Feel free to reach out!</p>
    </div>
      `,
    },
  ];

  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage = { role: "user", content: message };
      setChatHistory([...chatHistory, newMessage]);
      setIsLoading(true);

      const lowerCaseMessage = message.toLowerCase().trim();

      // Check if the message matches any predefined portfolio questions
      const matchedResponse = portfolioResponses.find(({ regex }) =>
        regex.test(lowerCaseMessage)
      );

      if (matchedResponse) {
        const aiResponse = matchedResponse.response;
        setRes(false);
        setChatHistory((prev) => [
          ...prev,
          { role: "ai", content: aiResponse },
        ]);
        setIsLoading(false);
        setMessage("");
        return;
      }
      // Otherwise, make API request to Gemini AI
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${
            import.meta.env.VITE_GEMINI_API_KEY
          }`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: message,
                    },
                  ],
                },
              ],
            }),
          }
        );

        const data = await response.json();
        if (
          data.candidates &&
          data.candidates.length > 0 &&
          data.candidates[0].content &&
          data.candidates[0].content.parts &&
          data.candidates[0].content.parts.length > 0
        ) {
          const aiResponse = data.candidates[0].content.parts[0].text;
          setRes(false);
          setChatHistory((prev) => [
            ...prev,
            { role: "ai", content: aiResponse },
          ]);
        } else {
          setChatHistory((prev) => [
            ...prev,
            { role: "ai", content: "No response from AI" },
          ]);
        }
      } catch (error) {
        console.error("Error:", error);
        setChatHistory((prev) => [
          ...prev,
          { role: "ai", content: "Error fetching response" },
        ]);
      } finally {
        setIsLoading(false);
        setMessage("");
      }
    }
  };

  // Scroll to the bottom of the chat container whenever chatHistory changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const renderMessage = (messageContent) => {
    const formattedText = marked(messageContent);
    return (
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: formattedText
            .replace(/<h1>/g, '<h1 class="text-2xl font-bold text-blue-600">') // Styling for <h1>
            .replace(
              /<h2>/g,
              '<h2 class="text-xl font-semibold text-green-600">'
            ) // Styling for <h2>
            .replace(/<strong>/g, '<strong class="text-purple-600 font-bold">') // Styling for bold text
            .replace(/<li>/g, '<li class="ml-4 list-disc">'), // Styling for bullet points
        }}
      />
    );
  };

  return (
    <div className="flex flex-col min-w-full items-center justify-center min-h-screen bg-black">
      <div className="md:min-w-full w-full max-w-lg p-6 bg-slate-900 rounded-lg shadow-md">
        {res ? (
          <h1 className="text-3xl text-white h-0">
            Portfolio{" "}
            <span className="text-pink-600 animate-pulse"> Chat Bot</span>{" "}
          </h1>
        ) : (
          ""
        )}

        <div
          ref={chatContainerRef} // Attach the ref to the chat history container
          className="md:h-[38rem] md:w-full h-[500px] overflow-y-auto border-b-2 border-gray-300 mb-4"
        >
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`p-2 mb-2 rounded-md ${
                chat.role === "user"
                  ? "bg-blue-400 self-end "
                  : "bg-gray-800 text-white font-bold "
              }`}
            >
              <p className="text-lg">{renderMessage(chat.content)}</p>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center items-center mt-4">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8"></div>
            </div>
          )}
        </div>
        <div className="flex space-x-2 w-full">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isLoading ? "Loading..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
