export const callApi = (reqMethod: string, uri: string, data: any = null) => {
  const options: RequestInit = {
    method: reqMethod,
    headers: { "Content-Type": "application/json" },
  }

  if (reqMethod === "POST" || reqMethod === "PUT") {
    options.body = JSON.stringify(data)
  }

  return fetch(uri, options)
    .then(async (response) => {
      const contentType = response.headers.get("content-type")

      let responseData
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json()
      } else {
        responseData = await response.text()
      }

      if (!response.ok) {
        const errorMsg =
          typeof responseData === "string"
            ? responseData
            : responseData.message || `${response.status} - ${response.statusText}`
        throw new Error(errorMsg)
      }

      return responseData
    })
    .catch((error) => {
      console.error("API Call Error:", error)
      throw error
    })
}
