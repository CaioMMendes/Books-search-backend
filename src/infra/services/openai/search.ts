import OpenAI from "openai"
import { HttpException } from "../../../types/http-exception"
import { GptResponse } from "../../../app/useCases/books-useCases"

export async function searchOpenAI(input: string): Promise<GptResponse> {
  const openAi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  try {
    const response = await openAi.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
        - Não é para buscar nada fora dos dados fornecidos
        - Preciso da resposta no formato de JSON
        - Não é para inventar nenhuma informação, quero apenas que retorne o que foi solicitado
        - Lista de categorias: ['Ficção', 'não-ficção', 'romance', 'terror', 'aventura', 'fantasia', 'biografia', 'historia', entre outros]
        - realizar uma busca por title, authors, categories e longDescription
        - indentificar se a mensagem do usuário corresponde a alguma categoria da lista de categorias em português ou ingles
        - Retornar apenas o primeiro author
        - Instruções de formato de saída para JSON:  
        {title:string,
  authors:string,
  categories:string,
  longDescription:string}
  - Retornar todas as informações em ingles
`,
        },
        {
          role: "user",
          content: input,
        },
      ],
      response_format: {
        type: "json_object",
      },
      model: "gpt-3.5-turbo",
    })

    console.log("Search OpenAI called")
    const output = JSON.parse(response.choices[0].message.content!)
    return output
  } catch (error: any) {
    console.log(error)
    throw new HttpException(500, error?.message)
  }
}
