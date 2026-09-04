import { ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/role/entities/role.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ){}

  public async accountExists(createUserDto: CreateUserDto): Promise<boolean> {
    return await this.userRepository
    .createQueryBuilder('user')
    .where('user.userName = :userName', {userName: createUserDto.userName})
    .orWhere('user.email = :email', {email: createUserDto.email})
    .getExists();
  }

  public async createPasswordHash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public async create(createUserDto: CreateUserDto): Promise<User>{
    const role = await this.roleRepository.findOneBy({id: 1});
    if(!role) throw new InternalServerErrorException();
    if(await this.accountExists(createUserDto)) throw new ConflictException();
    createUserDto.password = await this.createPasswordHash(createUserDto.password);
    const user = this.userRepository.create(createUserDto);
    user.roles = [role];
    return await this.userRepository.save(user);
  }

  public async login(loginUserDto: LoginUserDto): Promise<User>{
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where('user.userName = :userName', {userName: loginUserDto.userName})
      .getOne();
      if(user === null) throw new UnauthorizedException();
      if(await !bcrypt.compare(loginUserDto.password, user.password)) throw new UnauthorizedException();
      return user;
  }

  public async update(id: number, updateUserDto: UpdateUserDto){
    if(updateUserDto.password) updateUserDto.password = await this.createPasswordHash(updateUserDto.password);
    const user = await this.userRepository.update(id, updateUserDto);
    if(user.affected === 0) throw  new NotFoundException();
    return this.userRepository.findOneByOrFail({id});
  }
}
