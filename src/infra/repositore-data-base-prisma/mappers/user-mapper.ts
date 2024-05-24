import { User as UserPrisma } from "@prisma/client";
import { User } from "../../../domain/entity/user";

export class UserMapper {
  
    static invoceMapper(data: UserPrisma): User {
        // Mapeie os dados do usuário para a entidade User
        const userProps = {
          // Certifique-se de que os nomes das propriedades correspondem aos esperados pela entidade User
          id: data.id,
          createdAt: data.createdAt,
          // Continue mapeando outras propriedades conforme necessário
        };
    
        // Crie uma nova instância da entidade User usando os dados mapeados
        return new User({
            id: userProps.id,
            createdAt: userProps.createdAt
        });
      }
}