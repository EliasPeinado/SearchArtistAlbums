import { getRepository } from 'typeorm';
import { Register } from '../entities/Register';

export function inserAny(searchValue: string) {
    const userRepository = getRepository(Register);
    const newUser = userRepository.create({ search: searchValue });
    userRepository.save(newUser);
}
