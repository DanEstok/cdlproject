import { TimelineService } from "./timeline.service";
export declare class TimelineController {
    private timeline;
    constructor(timeline: TimelineService);
    caseTimeline(req: any, caseId: string): Promise<import("./timeline.service").TimelineItem[]>;
}
