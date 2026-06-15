import { plainToInstance } from 'class-transformer';


export class DTOMapper {
    static toResponse(data: any,dto:any) {
        return plainToInstance(dto, data, {
            excludeExtraneousValues: true,
        });
    }
}