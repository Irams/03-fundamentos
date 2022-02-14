import { shallowMount } from '@vue/test-utils'
import Counter from '@/components/Counter'


describe('Counter Component', () =>{

    let wrapper

    beforeEach(() =>{
        wrapper = shallowMount(Counter)
    })

    // test('debe hacer match con el snapshot', () =>{
    //     const wrapper = shallowMount(Counter)
    //     expect(wrapper.html()).toMatchSnapshot()
    // })

    test('h2 debetener el valor por defecto "Counter"', () =>{
    
        expect(wrapper.find('h2').exists()).toBe(true)
    
        const h2Value =  wrapper.find('h2').text()

        expect(h2Value).toBe('Counter')
    })

    test('El valor en el segundo párrafo debe ser 100', async () =>{

        const value =  wrapper.find('[data-testid="counter"]').text()
        // console.log(pTags)
        // expect(pTags[1].text()).toBe('100')
        expect(value).toBe('100')

    })

    test('debe incrementar y decrementar el contador el valor del contador', async() =>{

        const [increaseBtn, decreaseBtn] = wrapper.findAll('button')

        await increaseBtn.trigger('click')
        await increaseBtn.trigger('click')
        await increaseBtn.trigger('click')
        await decreaseBtn.trigger('click')
        await decreaseBtn.trigger('click')

        const value = wrapper.find('[data-testid="counter"]').text()

        expect(value).toBe('101')


    })

    test('decrementa dos en el valor del contador', async() =>{

        const decreaseBtn = wrapper.findAll('button')[1]

        await decreaseBtn.trigger('click')
        await decreaseBtn.trigger('click')

        const value = wrapper.find('[data-testid="counter"]').text()

        expect(value).toBe('98')
    })

    test('debe establecer el valor por defecto', ()=>{

        const {start} = wrapper.props()

        const value = wrapper.find('[data-testid="counter"]').text()

        expect(Number(value)).toBe(start)
        
    })   
    
    test('Debe de mostrar la prop title', ()=>{
        
        const title = 'Hola Hims'
        const wrapper = shallowMount(Counter, {
            props: {
                title,
                start: 5
            }
        })


        expect(wrapper.find('h2').text()).toBe(title)

    })

})