import { getCollection } from "../config/mongodb";

import { z } from "zod";
import { hashPassword, verifyPassword } from "../helpers/bcrypt";
import { ObjectId } from "mongodb";

const AddUserSchema = z.object({
  fullname: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(5),
  age: z.number(),
});

const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export class UserModel {
  static async collection() {
    return await getCollection("users");
  }

  static async getAllUser() {
    const collection = await this.collection();
    return collection.find().toArray();
  }

  static async getUser(_id) {
    const collection = await this.collection();
    const user = await collection.findOne({ _id });
    return user;
  }

  static async checkUserEmail(email) {
    const collection = await this.collection();
    const checkEmail = await collection.findOne({ email });
    return checkEmail;
  }

  static async addUser(user) {
    const validation = AddUserSchema.safeParse(user);
    if (!validation.success) {
      throw validation.error;
    }

    const collection = await this.collection();
    const result = await collection.insertOne({
      ...user,
      password: hashPassword(user.password),
    });
    return {
      _id: result.insertedId,
      ...user,
    };
  }

  static async login(user) {
    const validation = LoginUserSchema.safeParse(user);
    if (!validation.success) {
      throw validation.error;
    }

    const emailFound = await this.checkUserEmail(user.email);

    if (!emailFound) {
      return {
        errorMsg: "Email / password is wrong",
      };
    }

    const userFound = verifyPassword(user.password, emailFound.password);

    if (!userFound) {
      return {
        errorMsg: "Email / password is wrong",
      };
    }

    return emailFound;
  }

  static async findProfile(idUser) {
    let id = new ObjectId(String(idUser));
    const agg = [
      {
        $match: {
          _id: id,
        },
      },
      {
        $lookup: {
          from: "Scores",
          localField: "_id",
          foreignField: "userId",
          as: "historyId",
        },
      },
      {
        $lookup: {
          from: "story",
          localField: "historyId.storyId",
          foreignField: "_id",
          as: "history",
        },
      },
      {
        $addFields: {
          history: {
            $map: {
              input: "$history",
              as: "h",
              in: {
                $mergeObjects: [
                  "$$h",
                  {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$historyId",
                          cond: {
                            $eq: ["$$this.storyId", "$$h._id"],
                          },
                        },
                      },
                      0,
                    ],
                  },
                ],
              },
            },
          },
        },
      },
      {
        $addFields: {
          highestScore: {
            $max: "$historyId.score", // Calculate the maximum score from historyId array
          },
        },
      },
      {
        $addFields: {
          totalScore: { $sum: "$history.score" }, // Calculate the total score
        },
      },
    ];
    const collection = await this.collection();
    const cursor = collection.aggregate(agg);
    const result = await cursor.toArray();
    return result[0];
  }

  static async updateProfile({ idUser, fullname, bio }) {
    const id = new ObjectId(String(idUser));
    if (!fullname) {
      const res = await this.collection().updateOne(
        { _id: id },
        { $set: { bio: bio } },
      );
      return res;
    }
    if (!bio) {
      const res = await this.collection().updateOne(
        { _id: id },
        { $set: { fullname } },
      );
      return res;
    }
    if (bio && fullname) {
      const res = await this.collection().updateOne(
        { _id: id },
        { $set: { fullname: fullname, bio: bio } },
      );
      return res;
    }
  }

  static async googleLogin(data) {
    const collection = await this.collection();
    const user = await collection.findOne({ email: data.email });

    if (!user) {
      const result = await collection.insertOne({
        ...data,
        password: hashPassword(data.password),
      });
      return {
        _id: result.insertedId,
        ...data,
      };
    }

    return user;
  }
}
