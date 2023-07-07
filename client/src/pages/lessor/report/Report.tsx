import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Pie, PieChart, Cell } from "recharts";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect } from "react";
import {
    getApartmentsAsync,
    getBillsAsync,
    getRoomsAsync,
} from "../lessorAction";
import { useSearchParams } from "react-router-dom";
import { RoomStatus } from "../models";

const Report = () => {
    let [searchParams, setSearchParams] = useSearchParams();

    const {
        addRoomDialog,
        addContractDialog,
        addBillDialog,
        editRoomDialog,
        isOpenDialogConfirmDelete,
        roomListPage,
        apartmentListPage,
        selectedRoom,
    } = useAppSelector((state) => state.lessor);
    const soNha = apartmentListPage.items.length;
    const soPhong = roomListPage.items.length;
    const soPhongSapTrong = roomListPage.items.filter(
        (x) => x.status === RoomStatus.OutSoon
    ).length;
    const soPhongTrong = roomListPage.items.filter(
        (x) => x.status === RoomStatus.Available
    ).length;
    const data = [
        { name: "Số nhà", value: soNha },
        { name: "Số phòng", value: soPhong },
        {
            name: "Số phòng sắp trống",
            value: soPhongSapTrong,
        },
        {
            name: "Số phòng trống",
            value: soPhongTrong,
        },
    ];
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    const RADIAN = Math.PI / 180;

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getBillsAsync());
        dispatch(getApartmentsAsync());
        if (searchParams.get("apartmentId")) {
            dispatch(
                getRoomsAsync({
                    id: Number(searchParams.get("apartmentId")),
                })
            );
        }
    }, [searchParams.get("apartmentId")]);

    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <Stack padding={"8px"}>
            <Stack padding={"8px"}>
                <Typography variant="h5" component="h3">
                    Thông tin nhà
                </Typography>
            </Stack>
            <Stack direction="row" spacing={2} gap={2}>
                <Stack>
                    <Card
                        style={{
                            width: 200,
                            background: COLORS[0],
                            color: "#fff",
                        }}
                    >
                        <CardContent>
                            <Stack>Số nhà</Stack>
                            <Stack>{soNha}</Stack>
                        </CardContent>
                    </Card>
                </Stack>
                <Stack>
                    <Card
                        style={{
                            width: 200,
                            background: COLORS[1],
                            color: "#fff",
                        }}
                    >
                        <CardContent>
                            <Stack>Số phòng</Stack>
                            <Stack>{soPhong}</Stack>
                        </CardContent>
                    </Card>
                </Stack>
                <Stack>
                    <Card
                        style={{
                            width: 200,
                            background: COLORS[2],
                            color: "#fff",
                        }}
                    >
                        <CardContent>
                            <Stack>Số phòng sắp trống</Stack>
                            <Stack>{soPhongSapTrong}</Stack>
                        </CardContent>
                    </Card>
                </Stack>
                <Stack>
                    <Card
                        style={{
                            width: 200,
                            background: COLORS[3],
                            color: "#fff",
                        }}
                    >
                        <CardContent>
                            <Stack>Số phòng trống</Stack>
                            <Stack>{soPhongTrong}</Stack>
                        </CardContent>
                    </Card>
                </Stack>
            </Stack>
            <Stack>
                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                </PieChart>
            </Stack>
        </Stack>
    );
};

export default Report;
