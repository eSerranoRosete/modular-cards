import { CardRecord } from "@/xata";
import { EditableData } from "@xata.io/client";

export interface TCard extends EditableData<CardRecord> {}

type Keys = keyof TCard;
