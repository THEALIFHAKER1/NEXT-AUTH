import React from "react"

function page() {
  const env = process.env.NEXT_PUBLIC_APP_URL
  console.log(env)
  return <div>page</div>
}

export default page
