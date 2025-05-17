// utils/scrapeTopicText.ts
import * as cheerio from 'cheerio';


export async function scrapeTopicText(topic: string): Promise<string> {
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(topic)}+article&hl=en`;

  const proxyAPI = "https://api.scraperapi.com?api_key=YOUR_SCRAPER_API_KEY&url=";
  const res = await fetch(`${proxyAPI}${encodeURIComponent(searchUrl)}`);
  const html = await res.text();

  const $ = cheerio.load(html);
  const links: string[] = [];

  $("a").each((_, el) => {
    const href = $(el).attr("href");
    if (href && href.startsWith("/url?q=") && !href.includes("webcache")) {
      const url = decodeURIComponent(href.split("/url?q=")[1].split("&")[0]);
      links.push(url);
    }
  });

  if (links.length === 0) throw new Error("No relevant links found for topic");

  const articleRes = await fetch(`${proxyAPI}${encodeURIComponent(links[0])}`);
  const articleHtml = await articleRes.text();
  const $$ = cheerio.load(articleHtml);

  const paragraphs: string[] = [];
  $$('p').each((_, el) => {
    const text = $$(el).text().trim();
    if (text.length > 100) paragraphs.push(text);
  });

  return paragraphs.slice(0, 5).join("\n\n"); // Return top 5 paragraphs
}
