import { httpServer } from '@shared/infra/http/app';
import { seedProducts, seedWarehouses } from '@shared/utils/seed';

const port = process.env.SERVER_PORT || 3333;

console.info("\n\n🚀 Shopify Fall 2022 - OKAAAAAAAY LET'S GO!");

httpServer.listen(port, async () => {
    console.info(` - Listening on port: ${port}`);
    seedWarehouses();
    seedProducts();
});
