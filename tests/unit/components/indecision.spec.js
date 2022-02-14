import { shallowMount } from '@vue/test-utils'
import Indecision from '@/components/Indecision'

describe('Indecision Component', ()=>{
    let wrapper
    let himsSpy

    //Mock del fetch:
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({
            answer: 'yes',
            forced: false,
            image: 'https://yesno.wtf/assets/yes/2.gif'
        })
    }))

    beforeEach(() =>{
        wrapper = shallowMount(Indecision)

        himsSpy = jest.spyOn(console, 'log')

        jest.clearAllMocks()

    })

    test('match con el snapshot', ()=>{
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('escribir en el input no debe dispara nada (console.log)', async ()=>{

        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')

        const input = wrapper.find('input')
        await input.setValue('Hola Mundo')

        expect(himsSpy).toHaveBeenCalledTimes(1)
        expect(getAnswerSpy).not.toHaveBeenCalled()

        // console.log(wrapper.vm);

    })

    test('escribir el simbolo de "?" debe disparar el getAnswer', async ()=>{
        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')
        const input = wrapper.find('input')
        await input.setValue('Va a llover?')
        expect(himsSpy).toHaveBeenCalledTimes(2)
        expect(getAnswerSpy).toHaveBeenCalled()

    })

    test('pruebas en getAnswer', async ()=>{
    
        await wrapper.vm.getAnswer()

        // console.log(wrapper.vm.img)
        // console.log(wrapper.vm.answer)

        const img = wrapper.find('img')

        expect(img.exists()).toBeTruthy()
        expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gif')
        expect(wrapper.vm.answer).toBe('Si!')

    })

    test('pruebas en getAnswer - fallo en el API', async() => {

        fetch.mockImplementationOnce(() => Promise.reject('API is down'))

        await wrapper.vm.getAnswer()

        const img = wrapper.find('img')
        
        expect(img.exists()).toBeFalsy()
        expect(wrapper.vm.answer).toBe('No se pudo cargar desde el API')
    })
})