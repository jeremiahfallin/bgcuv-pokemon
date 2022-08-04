import React from "react";
import styled from "styled-components";

const WinrateBarStyles = styled.div`
  position: relative;
  width: 100px;
  height: 20px;
`;

const WinsStyles = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  border-radius: 4px;
  width: var(--width);
  background: var(--green);
  border-top-right-radius: ${p => (p.hasLosses ? 0 : `4px`)};
  border-bottom-right-radius: ${p => (p.hasLosses ? 0 : `4px`)};
  z-index: 1;
`;

const WinTextStyles = styled.div`
  position: absolute;
  top: 3px;
  height: 100%;
  line-height: 15px;
  font-size: 12px;
  color: var(--black);
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  left: 9px;
  text-align: left;
  z-index: 1;
`;

const LossesStyles = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  border-radius: 4px;
  width: 100%;
  background: var(--red);
`;

const LossTextStyles = styled.div`
  position: absolute;
  top: 3px;
  height: 100%;
  line-height: 15px;
  font-size: 12px;
  color: var(--black);
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  right: 8px;
  text-align: right;
`;

const WinrateBar = ({ wins, losses }) => {
  return (
    <WinrateBarStyles>
      {wins && (
        <WinsStyles
          hasLosses={losses > 0}
          style={{ "--width": `${(100 * wins) / (wins + losses)}%` }}
        />
      )}
      {wins && <WinTextStyles>{wins}</WinTextStyles>} <LossesStyles />
      <LossTextStyles>{losses}</LossTextStyles>
    </WinrateBarStyles>
  );
};

export default WinrateBar;
