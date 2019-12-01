import koaRouter from 'koa-router';
import middlewareWrapper from '../components/middlewareWrapper';
import { doctorCategoryAction } from '../actions/doctorCategory';
import { doctorCategoryValidate } from '../validator/doctorCategory';
import authorization from '../middlewares/authorization';

const doctorCategoriesRouter = koaRouter({
  prefix: '/doctorCategories',
});

// doctorCategoriesRouter.use(authorization);

doctorCategoriesRouter.get('/', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const result = await doctorCategoryAction.get();

    return result;
  });
});

doctorCategoriesRouter.post('/', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const data = ctx.request.body;

    await doctorCategoryValidate.create(data);

    const doctorCategory = await doctorCategoryAction.create(data);

    return doctorCategory;
  });
});

doctorCategoriesRouter.put('/:id', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const data = ctx.request.body;
    const { id } = ctx.params;

    await doctorCategoryValidate.update(data);

    const result = await doctorCategoryAction.update(id, data);

    return result;
  });
});

doctorCategoriesRouter.delete('/:id', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const { id } = ctx.params;

    await doctorCategoryValidate.delete(id);

    const result = await doctorCategoryAction.delete(id);

    return result;
  });
});

export default doctorCategoriesRouter;
module.exports = doctorCategoriesRouter;
