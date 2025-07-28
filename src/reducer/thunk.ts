import { createAsyncThunk } from "@reduxjs/toolkit";
import { getImagesApi } from "../apis";
import { ImageData } from "../types";
import FastImage from "react-native-fast-image";
import { setLoading } from "./reducer";

export const fetchNextPage = createAsyncThunk<
  { items: ImageData[], hasMore: boolean },
  { page: number, perPage: number }
>(
  'feed/fetchNextPage',
  async ( payload, thunkAPI ) => {
    thunkAPI.dispatch(setLoading(true));
    const { page, perPage } = payload;

    const result =  await getImagesApi(page, perPage);
    FastImage.preload(result?.items.map(i => ({ uri: i.thumbnail })));

    return {...result, page};
  }
);