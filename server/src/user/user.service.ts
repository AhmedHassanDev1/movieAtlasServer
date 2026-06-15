import { Injectable } from '@nestjs/common';
import { DTOMapper } from 'src/shared/helpers/mapper';
import { PrismaService } from 'src/shared/services/prisma.service';
import { UserReponseDTO } from './dto/userReponse.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly Repo: PrismaService
    ) { }

    async getUseById(id: string) {
        const user = await this.Repo.user.findUnique({
            where: { id },
            select: {
                id: true,
                user_name: true,
                email: true,

                avatar: {
                    select: {
                        public_id:true,
                        url: true
                    }
                }
            }
        })
        return DTOMapper.toResponse(user, UserReponseDTO)
    }
}
