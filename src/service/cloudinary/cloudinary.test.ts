/**
 * @jest-environment node
 */

/* import { v2 as cloudinary } from "cloudinary";*/
import path from "path";
import dotenv from "dotenv";

import { existsSync } from "fs";

import { resolve } from "path";
import { uploadOne, getAll, getOneByPublicId, uploadMany, init } from ".";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const pathToPhoto1 = resolve(process.cwd(), "src", "static", "13.jpg");

const pathToPhoto2 = resolve(process.cwd(), "src", "static", "12.jpg");

jest.setTimeout(10000);

init();

describe("cloudinary", () => {
  test("Photo file exists", () => {
    expect(existsSync(pathToPhoto1)).toEqual(true);
    expect(existsSync(pathToPhoto2)).toEqual(true);
  });

  /* describe("upload file", () => {
    test("", async () => {
      const res = await upload(pathToPhoto);

      expect(res.type).toEqual("upload");
    });
  }); */

  test.skip("uploadMany", async () => {
    const res = await uploadMany([pathToPhoto1, pathToPhoto2]);

    expect(res).toEqual([
      {
        id: "gaknnxohiu6ltrklyqfu",
        url: "https://res.cloudinary.com/dojbazopp/image/upload/v1640190265/gaknnxohiu6ltrklyqfu.jpg",
      },
      {
        id: "vnnhkijf0tvxavpsb2tj",
        url: "https://res.cloudinary.com/dojbazopp/image/upload/v1640190265/vnnhkijf0tvxavpsb2tj.jpg",
      },
    ]);
  });

  test.skip("uploadOne", async () => {
    const res = await uploadOne(pathToPhoto2);

    expect(res).toEqual("hello");
  });

  test("getOneByPublicId", async () => {
    const public_id = "c8gjw3mbthl05wofjylo";

    const cloudinaryFile = await getOneByPublicId(public_id);

    expect(cloudinaryFile["public_id"]).toEqual(public_id);
  });

  test.skip("get all files", async () => {
    const res = await getAll();

    //expect(res.resources).toEqual("upload");

    const files = [
      "zvrf37bwvelk2q2sg3gp",
      "samples/landscapes/landscape-panorama",
    ];

    const publicIds = res.resources.map((data: any) => data.public_id);

    //expect(publicIds).toEqual("helo");

    files.forEach((publicId) => {
      expect(publicIds.includes(publicId)).toEqual(true);
    });
  });
});

const r = [
  {
    asset_id: "2a764af676a454cb397a1a8d886a0322",
    bytes: 37514,
    created_at: "2020-11-17T22:38:48Z",
    format: "jpg",
    height: 750,
    public_id: "zvrf37bwvelk2q2sg3gp",
    resource_type: "image",
    secure_url:
      "https://res.cloudinary.com/dojbazopp/image/upload/v1605652728/zvrf37bwvelk2q2sg3gp.jpg",
    type: "upload",
    url: "http://res.cloudinary.com/dojbazopp/image/upload/v1605652728/zvrf37bwvelk2q2sg3gp.jpg",
    version: 1605652728,
    width: 1200,
  },
  {
    asset_id: "468910f4f49d1de966114a819ddfdf54",
    bytes: 18761,
    created_at: "2020-11-17T22:38:48Z",
    format: "jpg",
    height: 500,
    public_id: "pujyohax9af05l18luvv",
    resource_type: "image",
    secure_url:
      "https://res.cloudinary.com/dojbazopp/image/upload/v1605652728/pujyohax9af05l18luvv.jpg",
    type: "upload",
    url: "http://res.cloudinary.com/dojbazopp/image/upload/v1605652728/pujyohax9af05l18luvv.jpg",
    version: 1605652728,
    width: 800,
  },
  {
    asset_id: "115f2bf860cd24620c81a011261e5e08",
    bytes: 7488,
    created_at: "2020-11-17T22:38:48Z",
    format: "jpg",
    height: 250,
    public_id: "e1hde6a6tnfqpckwszxr",
    resource_type: "image",
    secure_url:
      "https://res.cloudinary.com/dojbazopp/image/upload/v1605652728/e1hde6a6tnfqpckwszxr.jpg",
    type: "upload",
    url: "http://res.cloudinary.com/dojbazopp/image/upload/v1605652728/e1hde6a6tnfqpckwszxr.jpg",
    version: 1605652728,
    width: 400,
  },
  {
    asset_id: "e0e1fbc64d26c82623f83a4fd93cd9e3",
    bytes: 7858062,
    created_at: "2020-11-17T20:19:02Z",
    format: "jpg",
    height: 2349,
    public_id: "samples/landscapes/landscape-panorama",
    resource_type: "image",
    secure_url:
      "https://res.cloudinary.com/dojbazopp/image/upload/v1605644342/samples/landscapes/landscape-panorama.jpg",
    type: "upload",
    url: "http://res.cloudinary.com/dojbazopp/image/upload/v1605644342/samples/landscapes/landscape-panorama.jpg",
    version: 1605644342,
    width: 10906,
  },
  {
    asset_id: "cbaa8ce957f7fa4f1580e91f7c2fc1bd",
    bytes: 6620002,
    created_at: "2020-11-17T20:18:20Z",
    format: "gif",
    height: 180,
    public_id: "samples/animals/kitten-playing",
    resource_type: "image",
    secure_url:
      "https://res.cloudinary.com/dojbazopp/image/upload/v1605644300/samples/animals/kitten-playing.gif",
    type: "upload",
    url: "http://res.cloudinary.com/dojbazopp/image/upload/v1605644300/samples/animals/kitten-playing.gif",
    version: 1605644300,
    width: 320,
  },
  {
    asset_id: "873080b6a88152c8857f13d46d0d4d91",
    bytes: 3171453,
    created_at: "2020-11-17T20:18:00Z",
    format: "jpg",
    height: 2000,
    public_id: "samples/landscapes/nature-mountains",
    resource_type: "image",
    secure_url:
      "https://res.cloudinary.com/dojbazopp/image/upload/v1605644280/samples/landscapes/nature-mountains.jpg",
    type: "upload",
    url: "http://res.cloudinary.com/dojbazopp/image/upload/v1605644280/samples/landscapes/nature-mountains.jpg",
    version: 1605644280,
    width: 3000,
  },
  {
    asset_id: "0149c23d04bf75adfd0df324b70bbdd3",
    bytes: 2856169,
    created_at: "2020-11-17T20:17:42Z",
    format: "jpg",
    height: 1526,
    public_id: "samples/cloudinary-group",
    resource_type: "image",
    secure_url:
      "https://res.cloudinary.com/dojbazopp/image/upload/v1605644262/samples/cloudinary-group.jpg",
    type: "upload",
    url: "http://res.cloudinary.com/dojbazopp/image/upload/v1605644262/samples/cloudinary-group.jpg",
    version: 1605644262,
    width: 3000,
  },
  {
    asset_id: "716b30b89945c8bfbc6c85c65d5b9a68",
    bytes: 2129950,
    created_at: "2020-11-17T20:17:28Z",
    format: "jpg",
    height: 2000,
    public_id: "samples/food/spices",
    resource_type: "image",
    secure_url:
      "https://res.cloudinary.com/dojbazopp/image/upload/v1605644248/samples/food/spices.jpg",
    type: "upload",
    url: "http://res.cloudinary.com/dojbazopp/image/upload/v1605644248/samples/food/spices.jpg",
    version: 1605644248,
    width: 2000,
  },
  {
    asset_id: "cbecbdfc0f578a5bccd4ecc3a7813f2d",
    bytes: 1487070,
    created_at: "2020-11-17T20:17:18Z",
    format: "jpg",
    height: 1867,
    public_id: "samples/imagecon-group",
    resource_type: "image",
    secure_url:
      "https://res.cloudinary.com/dojbazopp/image/upload/v1605644238/samples/imagecon-group.jpg",
    type: "upload",
    url: "http://res.cloudinary.com/dojbazopp/image/upload/v1605644238/samples/imagecon-group.jpg",
    version: 1605644238,
    width: 2800,
  },
  {
    asset_id: "33940a616efa8fa405d46d4bd995402c",
    bytes: 1459256,
    created_at: "2020-11-17T20:17:08Z",
    format: "jpg",
    height: 2000,
    public_id: "samples/ecommerce/accessories-bag",
    resource_type: "image",
    secure_url:
      "https://res.cloudinary.com/dojbazopp/image/upload/v1605644228/samples/ecommerce/accessories-bag.jpg",
    type: "upload",
    url: "http://res.cloudinary.com/dojbazopp/image/upload/v1605644228/samples/ecommerce/accessories-bag.jpg",
    version: 1605644228,
    width: 3000,
  },
];
