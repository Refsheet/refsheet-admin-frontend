import React, { useState } from 'react'
import {
    Row,
    Col,
} from 'react-materialize'
import SearchBar from '../../SearchBar'
import { loader } from 'graphql.macro'
import HistoryCookie from '../../../utils/HistoryCookie'
import PaginatedCollection from '../../PaginatedCollection'
import CharacterItem from "../../PaginatedCollection/CharacterItem";

const getCharacters = loader('../../../graphql/getCharacters.graphql')

const List = () => {
    const [query, setQuery] = useState('')
    const recentCharacters = HistoryCookie.getCharacters()

    return (
        <div className={'container-large'}>
            <Row>
                <Col s={12} m={8} offset={'m2'}>
                    <SearchBar onSearch={setQuery} query={query} />
                </Col>
            </Row>

            <Row>
                <Col s={12} m={6} l={3}>
                    <PaginatedCollection
                        query={getCharacters}
                        title={'Recently Viewed'}
                        search={query}
                        variables={{
                            ids: recentCharacters,
                        }}
                        filter={(i) => recentCharacters.map((id) => i.find((j) => j.id === id))}
                        totalPages={4}
                        renderItem={(item) => <CharacterItem character={item} />}
                    />
                </Col>
                <Col s={12} m={6} l={3}>
                    <PaginatedCollection
                        query={getCharacters}
                        title={'Problem Children'}
                        search={query}
                        totalPages={4}
                        renderItem={(item) => <CharacterItem character={item} />}
                    />
                </Col>
                <Col s={12} m={6} l={3}>
                    <PaginatedCollection
                        query={getCharacters}
                        title={'Recently Created'}
                        search={query}
                        totalPages={4}
                        renderItem={(item) => <CharacterItem character={item} />}
                    />
                </Col>
                <Col s={12} m={6} l={3}>
                    <PaginatedCollection
                        query={getCharacters}
                        title={'Recently Reported'}
                        search={query}
                        totalPages={4}
                        renderItem={(item) => <CharacterItem character={item} />}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default List
