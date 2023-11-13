import payload from "payload";
import { CollectionConfig } from "payload/types";

const Posts: CollectionConfig = {
  slug: "posts",
  auth: true,

  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "type",
      type: "text",
      required: true,
    },
    {
      name: "mediaId",
      type: "relationship",
      relationTo: "media",
      required: true,
    },
    {
      name: "date",
      type: "date",
      defaultValue: Date.now,
    },
  ],
  endpoints: [
    {
      path: "/videos/streams",
      method: "get",
      handler: async (req, res, next) => {
        const streams = await payload.find({
          collection: "posts",
          where: {
            and: [
              {
                type: {
                  equals: "short video",
                },
              },
            ],
          },
        });
        if (streams) {
          res.status(200).send({ streams });
        } else {
          res.status(404).send({ error: "not found" });
        }
      },
    },
  ],
};

export default Posts;
