import koaRouter from 'koa-router';
import middlewareWrapper from '../components/middlewareWrapper';
import { doctorCategoryAction } from '../actions/doctorCategory';
import { doctorCategoryValidate } from '../validator/doctorCategory';
import authorization from '../middlewares/authorization';

const doctorsRouter = koaRouter({
  prefix: '/doctorCategories',
});

// doctorsRouter.use(authorization);

doctorsRouter.get('/', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const result = await doctorCategoryAction.get();

    return result;
  });
});

doctorsRouter.post('/', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const data = ctx.request.body;

    await doctorCategoryValidate.create(data);

    const doctor = await doctorCategoryValidate.create(data);

    return doctor;
  });
});

doctorsRouter.put('/:id', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const data = ctx.request.body;
    const { id } = ctx.params;

    await doctorCategoryValidate.update(data);

    const result = await doctorCategoryAction.update(id, data);

    return result;
  });
});

doctorsRouter.delete('/:id', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const { id } = ctx.params;

    await doctorCategoryValidate.delete(id);

    const result = await doctorCategoryAction.delete(id);

    return result;
  });
});

export default doctorsRouter;
module.exports = doctorsRouter;
