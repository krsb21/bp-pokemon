import { getPokemonList } from '../../src/helpers/getPokemonList';
describe('Test helper: getPokemonApiById', () => {
    [':1','1',null,':3'].map(variable => {
        test(`Testing ${variable}`,() => {
            getPokemonList(2121,variable).then(data => {
                expect(typeof data).toBe('object');
            });
        })
    })
})