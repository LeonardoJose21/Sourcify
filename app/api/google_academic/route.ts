import { getJson } from "serpapi";
import { NextResponse } from "next/server";

  export async function POST(
    req: Request
  ) {
    try {
      const body = await req.json();
      const { query  } = body;
      const { init_year } = body;
      const { end_year } = body;
      const { hl } = body;

      const configuration = {
        engine: "google_scholar",
        api_key: process.env.GOOGLE_SCHOLAR_API,
        q: query,
        as_ylo: init_year,
        as_yhi:end_year,
        hl: hl,
      };

      const response = await getJson(configuration);

      return new NextResponse(JSON.stringify(response), { status: 200 });
    } catch (error) {
      console.log('[CONVERSATION_ERROR]', error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  };
