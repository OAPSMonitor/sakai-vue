import {expect, it, screen, setup} from '@/tests/utils'
import StatisticCard from '../../src/components/StatisticCard.vue'

it('should mount the component', () => {
    setup(StatisticCard, {
        renderOptions: {
            props: {
                title: 'Statistic Card Title',
                number: 123456789,
            },
        },
    })
    const card = screen.getByTestId('statistic-card')
    expect(card).toBeInTheDocument()
})

it('should render the title', () => {
    setup(StatisticCard, {
        renderOptions: {
            props: {
                title: 'Statistic Card Title',
                number: 123456789,
            },
        },
    })
    const titleElement = screen.getByText('Statistic Card Title')
    expect(titleElement).toBeInTheDocument()
})

it('should render the number', () => {
    setup(StatisticCard, {
        renderOptions: {
            props: {
                title: 'Statistic Card Title',
                number: 123456789,
            },
        },
    })
    const numberElement = screen.getByText('123456789')
    expect(numberElement).toBeInTheDocument()
})
