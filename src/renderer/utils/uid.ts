const POOL_SIZE_MULTIPLIER = 128;
const ID_SIZE = 4;

const pool = new Uint8Array(ID_SIZE * POOL_SIZE_MULTIPLIER);
let poolOffset = 0;

crypto.getRandomValues(pool);

function fillPool() {
  if (pool.length < poolOffset + ID_SIZE) {
    crypto.getRandomValues(pool);
    poolOffset = 0;
  }
  poolOffset += ID_SIZE;
}

export function uid() {
  fillPool();
  let id = 0;
  for (let i = poolOffset - ID_SIZE; i < poolOffset; i++) {
    id = (id << 8) + pool[i];
  }
  return id & 0x7fffffff;
}
