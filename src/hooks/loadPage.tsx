import React, { useMemo, useState, useEffect } from 'react';
import { useContexState } from '../hooks/context';

import api from '../services/api'

interface ConvertListParam {
    data: {
        id: number;
        number: number;
        name: string;
        phone: string;
        status: string;
        dealer: string;
        coupon: string;
        price: number;
        data_time: string;
    }[]
};

interface ConvertListReturn {
    [key: string]: [{
        id: number;
        name: string;
        phone: string;
        status: string;
        dealer: string;
        coupon: string
        price: number;
        data_time: string;
    }]
};

interface Lines {
    firstCard: number;
    id: string;
};

interface TypeObjFilter {
    ['count(*)']: number;
    status: string;
};

export function useLoadPage() {
    const {
        setlistData,
        setCountAnalyzed,
        setGetList,
        setIsMountedApi,
        setResponceArray,
        setNextPage,
        setSearchValue
    } = useContexState();

    const {
        perPage,
        sortNumber,
        nextPage,
        responceArray,
        rewindPage,
        searchValue
    } = useContexState();

    const [isMounted, setIsMounted] = useState(false);

    function convertList({ data }: ConvertListParam) {
        return data.reduce((h: ConvertListReturn, card) => {
            const user = {
                id: card.id,
                name: card.name,
                phone: card.phone,
                status: card.status,
                dealer: card.dealer,
                coupon: card.coupon,
                price: card.price,
                data_time: card.status,
            };
            return Object.assign(h, {
                [card.number]: (h[card.number] || []).concat(user)
            });
        }, {});
    };

    function NextPageController() {
        if (searchValue) return searchValue

        if (nextPage) {
            return responceArray.length > 0
                ? responceArray[responceArray.length - 1]?.number + 1
                : 0;
        };

        if (rewindPage) {
            return responceArray.length > 0
                ? responceArray[0]?.number - 1
                : 0;
        };

        return responceArray.length > 0
            ? responceArray[0]?.number
            : 0;
    };

    useEffect(() => {
        if (isMounted) {
            setIsMounted(false);

            /*
            for (let i = 504; i <= 1007; i++) {
                api.put("registerBuy", { number: i }).then();
            }
            */

            api.get("countCards", {}).then((responce) => {
                function filterCount(item: string) {
                    return Number(responce.data.filter((obj: TypeObjFilter) => {
                        return obj.status === item;
                    })[0]?.['count(*)']);
                };

                setCountAnalyzed({
                    analyzed: filterCount('analyzed'),
                    paid: filterCount('paid')
                });
            });

            if (sortNumber === 'default') {
                api.get("getAll", {
                    params: {
                        firstNumber: NextPageController(),
                        rewindPage: rewindPage
                    }
                }
                ).then((responce) => {
                    setIsMountedApi(true);
                    setSearchValue(undefined);
                    if (responce.data.length > 0) {
                        console.log(JSON.stringify(responce.data));
                        setGetList(convertList(responce));
                        setResponceArray(responce.data);
                    };
                });
            };

            if (sortNumber === 'analyzed') {
                api.get("getAnalyzed", {
                    params: {
                        firstNumber: NextPageController(),
                        rewindPage: rewindPage
                    }
                }
                ).then((responce) => {
                    setIsMountedApi(true);
                    setNextPage(false);
                    if (responce.data.length > 0) {
                        console.log(JSON.stringify(responce.data));
                        setGetList(convertList(responce));
                        setResponceArray(responce.data);
                    };
                });
            };

            if (sortNumber === 'paid') {
                api.get("getPaid", {
                    params: {
                        firstNumber: NextPageController(),
                        rewindPage: rewindPage
                    }
                }
                ).then((responce) => {
                    setIsMountedApi(true);
                    setNextPage(false);
                    if (responce.data.length > 0) {
                        console.log(JSON.stringify(responce.data));
                        setGetList(convertList(responce));
                        setResponceArray(responce.data);
                    };
                });
            };

            if (sortNumber === 'empty') {
                api.get("getEmpty", {
                    params: {
                        firstNumber: NextPageController(),
                        rewindPage: rewindPage
                    }
                }
                ).then((responce) => {
                    setIsMountedApi(true);
                    setNextPage(false);
                    if (responce.data.length > 0) {
                        console.log(JSON.stringify(responce.data));
                        setGetList(convertList(responce));
                        setResponceArray(responce.data);
                    };
                });
            };

        };
    }, [isMounted]);

    function LoadPage() {
        const lines: Lines[] = [];
        setIsMountedApi(false);

        for (let i = 0; i < perPage; i++) {
            lines.push({ firstCard: 123, id: String(i) });
        };

        setlistData([...lines]);
        setIsMounted(true);
    };

    return { LoadPage };
};