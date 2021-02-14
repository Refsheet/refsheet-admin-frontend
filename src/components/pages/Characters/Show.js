import {useParams} from "react-router";
import {Query} from "@apollo/client/react/components";
import {Error, Loading} from "../../providers/SessionProvider";
import React from "react";
import {loader} from "graphql.macro";
const getCharacter = loader('../../../graphql/getCharacter.graphql')

const Show = () => {
    const { shortcode } = useParams()

    return (
        <Query query={getCharacter} variables={{ shortcode: shortcode }}>
            {({ data, loading, error }) =>
                loading ? (
                    <Loading />
                ) : error ? (
                    <Error error={error} />
                ) : (
                    <div>{ JSON.stringify({data, loading, error}) }</div>
                )
            }
        </Query>
    )
}

export default Show
