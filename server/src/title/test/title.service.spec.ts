import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "src/shared/services/prisma.service";
import { titlePrismaMock } from "../mock/titleService.mock";
import { TitleService } from "../title.service";

describe("TitleService", () => {
    let service: TitleService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TitleService,
                {
                    provide: PrismaService,
                    useValue: titlePrismaMock,
                },
            ],
        }).compile();
        service = module.get<TitleService>(TitleService)
    })

    it("should return title if title by id is exists", async () => {
        const title = { id: "1", title: "jocker", overview: "overview..." }
        titlePrismaMock.title.findUnique.mockResolvedValue(title)
        const resulte = await service.getMovieById("1")
        expect(resulte).toEqual(title)
        expect(titlePrismaMock.title.findUnique).toHaveBeenCalledWith({
            where: { id: "1" },
        });
    })

    it("should throw not Found error if title by id is not exists", async () => {
        titlePrismaMock.title.findUnique.mockResolvedValue(null)
        expect(service.getMovieById("1")).rejects.toThrow("not found this content.")
        expect(titlePrismaMock.title.findUnique).toHaveBeenCalledWith({
            where: { id: "1" },
        });
    })

})