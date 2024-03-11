import {UserDto} from "./users.model";
import {selectAllEntities, withActiveId, withEntities} from "@ngneat/elf-entities";
import {createStore} from "@ngneat/elf";

export const USERS_STORE_NAME = 'users';

// @ts-ignore
export const usersStore = createStore(
  {
    name: USERS_STORE_NAME,
  },
  withEntities<UserDto>(),
  withActiveId()
);

export const StoredUsers$ = usersStore.pipe(selectAllEntities());

