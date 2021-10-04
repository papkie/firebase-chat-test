import { read } from "./db";
export type ChannelDetails = {
  id: string;
  title: string;
  topic: string;
};

export const getChannels = async (): Promise<Array<ChannelDetails>> => {
  const result = await read("channels");

  const parsedResult = result.val() as {
    [chatId: string]: {
      title: string;
      topic: string;
    };
  };

  return Object.keys(parsedResult).map((channel) => {
    const { topic, title } = parsedResult[channel];
    return {
      topic,
      title,
      id: channel,
    };
  });
};
