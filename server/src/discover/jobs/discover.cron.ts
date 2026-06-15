import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { DiscoverAsyncService } from "../services/DiscoverSync.service";

@Injectable()
export class DiscoverCron {
    private readonly logger = new Logger(DiscoverCron.name);
    private isRunning = false;

    constructor(private readonly discoverAsyncService: DiscoverAsyncService) { }

    @Cron(CronExpression.EVERY_6_HOURS)
    async syncMovieDiscoverLists() {
        if (this.isRunning) {
            this.logger.warn("Movie discover sync is already running.");
            return;
        }

        this.isRunning = true;

        try {
            const results = await this.discoverAsyncService.syncMovieDiscoverLists();
            this.logger.log(`Movie discover sync completed: ${JSON.stringify(results)}`);
        } catch (error) {
            this.logger.error("Movie discover sync failed.", error?.stack ?? error);
        } finally {
            this.isRunning = false;
        }
    }
}
