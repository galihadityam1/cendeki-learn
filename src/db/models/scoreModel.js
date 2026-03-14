import { ObjectId } from "mongodb";
import { getCollection } from "../config/mongodb";
import { z } from "zod";

export class ScoreModel {
  static async collection() {
    return await getCollection("Scores");
  }

  static async addScore({ userId, score, storyId, playDate }) {
    const idUser = new ObjectId(String(userId));
    const idStory = new ObjectId(String(storyId));
    const collection = await this.collection();
    return await collection.insertOne({
      storyId: idStory,
      userId: idUser,
      score,
      playDate,
    });
  }

  static async getScoreById(_id) {
    const collection = await this.collection();
    const result = await collection.findOne({ _id });
    return result;
  }

  static async getScoresByUserId(userId) {
    const collection = await this.collection();
    const result = await collection.find({ userId }).toArray();
    return result;
  }

  static async getAllScore() {
    const agg = [
      {
        $group: {
          _id: "$userId",
          totalScore: {
            $sum: "$score",
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
        },
      },
      {
        $project: {
          _id: "$_id",
          totalScore: 1,
          user: {
            name: "$user.fullname",
            email: "$user.email",
          },
        },
      },
      {
        $sort: {
          totalScore: -1,
        },
      },
    ];

    const collection = await this.collection();
    const cursor = collection.aggregate(agg);
    const result = await cursor.toArray();
    return result;
  }
}
