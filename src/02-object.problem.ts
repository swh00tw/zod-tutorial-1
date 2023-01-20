// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const PersonResult = z.object({
  name: z.string(),
  height: z.string(),
});
//                   ^ 🕵️‍♂️

export const fetchStarWarsPersonName = async <TData>(
  id: string,
  schema: z.Schema<TData>
): Promise<TData> => {
  const data = await fetch(
    "https://www.totaltypescript.com/swapi/people/" + id + ".json"
  ).then((res) => res.json());
  return schema.parse(data);
};

// TESTS

it("Should return the name", async () => {
  expect(
    await fetchStarWarsPersonName("1", PersonResult).then((res) => res.name)
  ).toEqual("Luke Skywalker");
  expect(
    await fetchStarWarsPersonName("2", PersonResult).then((res) => res.name)
  ).toEqual("C-3PO");
});
