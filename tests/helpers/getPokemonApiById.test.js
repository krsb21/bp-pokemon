import { getPokemonApiById } from '../../src/helpers/getPokemonApiById';
describe('Test helper: getPokemonApiById', () => {
    ['8000','2886',34,()=>{return 2886},'asd',null].map(variable => {
        test(`Testing ${variable}`,() => {
            getPokemonApiById(variable).then(data => {
                expect(typeof data).toBe('object');
            })
        })
    })
})