import { NextResponse } from "next/server";

let cachedData: any = null;
let cacheTime = 0;

export async function GET() {
  const oneDay = 24 * 60 * 60 * 1000;
  const now = Date.now();

  if (cachedData && now - cacheTime < oneDay) {
    console.log("Using cached github data!");
    return NextResponse.json(cachedData);
  }

  const currentDateString = new Date().toISOString();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const oneYearAgoString = oneYearAgo.toISOString();

  const query = `
    {
      viewer {
        login
        contributionsCollection(from: "${oneYearAgoString.split('T')[0]}T00:00:00Z", to: "${currentDateString.split('T')[0]}T00:00:00Z") {
          totalCommitContributions
          totalIssueContributions
          totalPullRequestContributions
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch from GitHub" }, { status: 500 });
  }

  const data = await res.json();

  cachedData = data.data.viewer.contributionsCollection;
  cacheTime = now;

  console.log("Fetched new github data! -> Cache updated.");

  return NextResponse.json(cachedData);
}