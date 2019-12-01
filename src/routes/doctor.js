import koaRouter from 'koa-router';
import middlewareWrapper from '../components/middlewareWrapper';
import { doctorAction } from '../actions/doctor';
import { doctorValidate } from '../validator/doctor';
import { userValidate } from '../validator/user';
import authorization from '../middlewares/authorization';

const doctorsRouter = koaRouter({
  prefix: '/doctors',
});

// doctorsRouter.use(authorization);

doctorsRouter.get('/', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const result = await doctorAction.get();

    return result;
  });
});

doctorsRouter.get('/:id', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const { id } = ctx.params;
    const result = await doctorAction.findById(id);

    return result;
  });
});

doctorsRouter.post('/', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const data = ctx.request.body;

    await userValidate.create(data);
    await doctorValidate.create(data);

    const doctor = await doctorAction.create(data);

    return doctor;
  });
});

doctorsRouter.put('/:id', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const data = ctx.request.body;
    const { id } = ctx.params;

    const userId = await doctorValidate.update(data, id);

    await userValidate.update(data, userId);

    const result = await doctorAction.update(id, data);

    return result;
  });
});

doctorsRouter.delete('/:id', async (ctx, next) => {
  await middlewareWrapper.wrap(ctx, next, async () => {
    const { id } = ctx.params;

    await doctorValidate.delete(id);

    const result = await doctorAction.delete(id);

    return result;
  });
});

export default doctorsRouter;
module.exports = doctorsRouter;
