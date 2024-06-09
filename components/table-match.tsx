import { PageInfo, Match } from "lib/types";
import { useState } from "react";
import lksLogo from "public/icons/logoWithBg.svg";
import Image from "next/image";
import { parseDate } from "@/lib/utils";

interface Props {
  matchesData: { edges: Match[]; pageInfo: PageInfo };
}

const generateSign = (goalsScored: number, goalsLost: number) => {
  if (goalsScored > goalsLost) {
    return (
      <div className="w-6 h-6 rounded-lg flex justify-center items-center bg-[#31AA6E] text-md">
        <span className="text-darkBurgund">✔</span>
      </div>
    );
  }

  if (goalsScored < goalsLost) {
    return (
      <div className="w-6 h-6 rounded-lg flex justify-center items-center bg-[#F65962] text-md">
        <span className="text-darkBurgund">✕</span>
      </div>
    );
  }

  return (
    <div className="w-6 h-6 rounded-lg flex justify-center items-center bg-[#A6ADBC] text-md">
      <span className="text-darkBurgund">—</span>
    </div>
  );
};

export default function TableMatch({ matchesData }: Props) {
  const [matches, setMatches] = useState(matchesData.edges);
  const [pageInfo, setPageInfo] = useState(matchesData.pageInfo);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <section className="h-[500px] w-full flex justify-center items-center bg-[url('/images/peachBallBg.jpg')] bg-cover bg-left bg-fixed">
      <div className="overflow-x-auto">
        <table className="table sm:min-w-[400px] md:min-w-[700px] overflow-hidden">
          <thead>
            <tr className="text-slate-300">
              <th className="hidden sm:table-cell"></th>
              <th>Gospodarze</th>
              <th className="text-center">Wynik</th>
              <th className="text-right">Goście</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => {
              const lksKM = {
                name: "LKS Kończyce Małe",
                logo: lksLogo,
              };

              const opponent = {
                name: match.node.matchFields.opponent,
                logo: match.node.matchFields.opponentLogo.node.sourceUrl,
              };

              const hostTeam = match.node.matchFields.hosts ? lksKM : opponent;
              const guestTeam = match.node.matchFields.hosts ? opponent : lksKM;

              const goalsScored = match.node.matchFields.goalsScored || 0;
              const goalsLost = match.node.matchFields.goalsLost || 0;

              const result = match.node.matchFields.hosts
                ? `${goalsScored} : ${goalsLost}`
                : `${goalsLost} : ${goalsScored}`;

              return (
                <tr key={match.node.slug}>
                  <th className="hidden sm:flex flex-col items-center text-center">
                    {generateSign(goalsScored, goalsLost)}
                    <span className="pt-1 block text-[10px]">
                      {parseDate(match.node.matchFields.date)}
                    </span>
                  </th>
                  {/* host */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="hidden sm:avatar">
                        <div className="mask w-12 h-12">
                          <Image
                            src={hostTeam.logo}
                            alt={`${hostTeam.name} logo`}
                            height={20}
                            width={20}
                          />
                        </div>
                      </div>
                      <div className="relative">
                        <div
                          className="tooltip font-bold text-xs sm:text-sm text-left"
                          data-tip={parseDate(match.node.matchFields.date)}
                        >
                          {hostTeam.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  {/* result */}
                  <td align="center">
                    <div
                      className="tooltip font-bold text-center"
                      data-tip={parseDate(match.node.matchFields.date)}
                    >
                      <span className="font-normal">{result}</span>
                    </div>
                  </td>
                  {/* guest */}
                  <td>
                    <div className="flex items-center justify-end gap-3">
                      <div>
                        <div
                          className="tooltip font-bold text-end text-xs sm:text-sm"
                          data-tip={parseDate(match.node.matchFields.date)}
                        >
                          {guestTeam.name}
                        </div>
                      </div>
                      <div className="hidden sm:avatar">
                        <div className="mask  w-12 h-12">
                          <Image
                            src={guestTeam.logo}
                            alt={`Logo ${match.node.matchFields.opponent}`}
                            height={20}
                            width={20}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
