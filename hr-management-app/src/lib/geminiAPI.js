// src/lib/geminiAPI.js
const {
    GoogleGenerativeAI,
  } = require("@google/generative-ai");
  
  export async function calculateMatchScore(jobDescription, resume) {
    const apiKey = process.env.GEMINI_API_KEY; 
    const genAI = new GoogleGenerativeAI(apiKey);
  
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", 
    });
  
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };
  
    const parts = [
      {
        text: "You are a recruiter working on recruitment assignments and your job is to assess the attached resume with reference to the provided job description and report assessment of CV against requirements per JD. Do not make up any information. Just absorb the information from JD and Resume and analyze objectively. Please highlight the matches and achievements while also highlighting the missing aspects. Your input will help in the initial assessment of the resume's suitability to the role. Keep the output crisp and to the point. I would like to rely on your analysis and rating. So, please analyze objectively by comparing the JD with the resume in a critical and realistic manner.\nFollowing are the points you need to consider:  \nKey Skills : This is a critical parameter. \nAcademic Qualification - required as per JD Vs actual qualification in the CV. This is a critical parameter. If education is related to entirely irrelevant field or industry, lower the rating. \nAchievements - key achievements of the candidate relevant to the JD. If achievements are not relevant to the JD do not score high.. This is a critical parameter. \nResponsibilities - list of responsibilities that are matching and that are missing. This is a critical parameter.\nYears of experience - number of years of required as per JD Vs actual number of years of experience of the candidate. If any specific number of years are mentioned in the JD in any role or technology or skill, please make sure to provide deeper insights. \nIndustry : Actual Industries working by the candidate Vs Industry of the job opening. Industry relevance is a critical parameter. \nLocation : Job Location Vs Current Location of candidate (no rating required) \nOverall Rating – rate on a scale of 1-10, 1 being no match overall and 10 being perfect match. Give higher weightage to critical parameters while giving this rating. Please consider match in current experience/capabilities while providing the rating and not future possibilities.\n\n**Job Description:**\n```\n" + jobDescription + "\n```\n\n**Resume:**\n```\n" + resume + "\n```"
      },
      { text: "output: " },
    ];
  
    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
      });
  
      // Extract the rating from the Gemini output
      const ratingMatch = result.response.text().match(/Overall Rating.*?(\d)/);
      const rating = ratingMatch ? parseInt(ratingMatch[1], 10) : null;
  
      return rating; // Return the extracted rating (or null if not found)
    } catch (error) {
      console.error("Error calculating match score:", error);
      throw error; // Re-throw the error to be handled at a higher level
    }
  }