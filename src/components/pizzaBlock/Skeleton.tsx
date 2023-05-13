import React, {FC} from "react"
import ContentLoader from "react-content-loader"

const Skeleton: FC = () => (
    <ContentLoader
        className={'pizza-block'}
        speed={2}
        width={280}
        height={466}
        viewBox="0 0 280 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="140" cy="135" r="125"/>
        <rect x="0" y="285" rx="7" ry="7" width="280" height="25"/>
        <rect x="0" y="325" rx="7" ry="7" width="280" height="80"/>
        <rect x="-1" y="420" rx="7" ry="7" width="95" height="30"/>
        <rect x="124" y="415" rx="20" ry="20" width="152" height="45"/>
    </ContentLoader>
)

export default Skeleton;

