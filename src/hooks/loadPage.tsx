import React, { useMemo, useState, useEffect } from 'react';
import { useContexState } from '../hooks/context';

import api from '../services/api'

interface ConvertListParam {
    data: {
        id: number;
        number: number;
        name: string;
        phone: string;
        price: number;
        analyzed: number;
        created_at: string;
    }[]
};

interface ConvertListReturn {
    [key: string]: [{
        id: number;
        name: string;
        phone: string;
        price: number;
        analyzed: number;
        created_at: string;
    }]
};

interface Lines {
    firstCard: number;
    id: string;
};

interface TypeObjFilter {
    ['count(*)']: number;
    analyzed: number;
};

export function useLoadPage() {
    const [isMounted, setIsMounted] = useState(false);

    const {
        setlistData,
        setCountAnalyzed,
        setGetList,
        setIsMountedApi,
        setResponceArray,
        setNextPage,
        setLoginValue,
        setRewindPage,
        setSelectedNumber
    } = useContexState();

    const {
        listData,
        perPage,
        getList,
        sortNumber,
        selectedNumber,
        loginValue,
        nextPage,
        responceArray,
        isMountedApi,
        rewindPage
    } = useContexState();

    function convertList({ data }: ConvertListParam) {
        return data.reduce((h: ConvertListReturn, card) => {
            const user = {
                id: card.id,
                name: card.name,
                phone: card.phone,
                price: card.price,
                analyzed: card.analyzed,
                created_at: card.created_at,
            };
            return Object.assign(h, {
                [card.number]: (h[card.number] || []).concat(user)
            });
        }, {});
    };

    function LimiterNumber(number: number) {
        if (number + (perPage * 6) - 1 < 9999) {
            return number + (perPage * 6) - 1
        } else {
            return 9999
        };
    };

    function NextPageController() {
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

            api.get("countCards", {}).then((responce) => {
                function filterCount(item: number) {
                    return Number(responce.data.filter((obj: TypeObjFilter) => {
                        return obj.analyzed === item;
                    })[0]?.['count(*)']);
                };

                setCountAnalyzed({
                    false: filterCount(0),
                    true: filterCount(1)
                });
            });

            if (sortNumber === 'default') {
                api.get("getCards", {
                    params: {
                        firstNumber: listData[0]?.firstCard,
                        lastNumber: LimiterNumber(listData[0]?.firstCard),
                    }
                }
                ).then((responce) => {
                    setIsMountedApi(true);
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
        };
    }, [isMounted]);

    function LoadPage(value: number | number = 0) {
        const lines: Lines[] = [];
        setIsMountedApi(false);

        for (let i = 0; i < perPage; i++) {
            lines.push({ firstCard: i + value, id: String(i) });
        };

        setlistData([...lines]);
        setIsMounted(true);
    }

    return { LoadPage };
};