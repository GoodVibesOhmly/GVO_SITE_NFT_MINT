import { SvgIcon, Link } from "@material-ui/core";
import { ReactComponent as GitHub } from "../../assets/icons/github.svg";
import { ReactComponent as Medium } from "../../assets/icons/medium.svg";
import { ReactComponent as Twitter } from "../../assets/icons/twitter.svg";
import { ReactComponent as Discord } from "../../assets/icons/discord.svg";

export default function Social() {
  return (
    <div className="social-row">
      <Link href="https://github.com/GoodVibesOhmly/GVO" target="_blank">
        <SvgIcon color="primary" component={GitHub} />
      </Link>

      <Link
        href="https://livethelifetvdao.notion.site/livethelifetvdao/Good-Vibes-Ohmly-Draft-Proposal-34b49279d917473a8054443d0c6d2ae1/"
        target="_blank"
      >
        <SvgIcon color="primary" component={Medium} />
      </Link>

      <Link href="https://twitter.com/LiveTheLifeTV/" target="_blank">
        <SvgIcon color="primary" component={Twitter} />
      </Link>

      <Link href="https://discord.gg/gGZUMVDuhQ" target="_blank">
        <SvgIcon color="primary" component={Discord} />
      </Link>
    </div>
  );
}
