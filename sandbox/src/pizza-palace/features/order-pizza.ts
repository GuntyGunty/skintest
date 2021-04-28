import { feature, I } from '@skintest/api';
import { order_form } from '../components';

feature('order pizza')

  .before('feature'
    , I.amOnPage(order_form.url)
  )

  .scenario('successfully complete'
    , I.say('drag the pizza size slider')
    , I.drag(order_form.pie_size_handle, 100, 0)

    , I.say('select the toppings')
    , I.click(order_form.next_step(1))
    , I.click(order_form.pizza('pepperoni'))

    // , I.debug(async dbg => {
    //   const ref = await dbg.$(order_form.pizza('pepperoni'));
    //   const text = await ref?.innerText();
    //   console.log(text);
    // })

    // , I.inspect(order_form.pizza('pepperoni'))
     , I.inspect('label')
    // , I.inspect('not-existing-element-test')
    // , I.pause()

    , I.click(order_form.next_step(2))

    , I.say('fill the address form')
    , I.click(order_form.map_zoom_in)
    , I.click(order_form.confirm_addres)
    , I.fill(order_form.phone, '+1-541-754-3001')
    , I.click(order_form.next_step(3))

    , I.say('submit the order')
    , I.click(order_form.complete_order)
  )