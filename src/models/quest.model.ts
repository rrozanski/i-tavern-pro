import { QuestStatus } from '@/enums';

export interface Quest {
    id: number;
    description: string;
    status: QuestStatus;
}
