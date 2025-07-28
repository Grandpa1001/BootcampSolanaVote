import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Keypair, PublicKey } from "@solana/web3.js";
import { Voting } from "../target/types/voting";
import { startAnchor } from "solana-bankrun";
import { BankrunProvider } from "anchor-bankrun";
import { describe, it } from "node:test";
import assert from 'assert';


const IDL = require('../target/idl/voting.json');

const votingAddress = new PublicKey("6syhm79wjveGFoAfhyH2YGYfzSJjPGknkuX4sXG6skvt");


describe("Voting", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  console.log("Running tests for Voting program...");

  it("Initialize Poll!", async () => {
    const context = await startAnchor("", [{name: "voting", programId: votingAddress}],[]);
    const provider = new BankrunProvider(context);

    const votingProgram = new Program<Voting>(
      IDL,
      provider
    );

    await votingProgram.methods.initializePoll(
      new anchor.BN(1),
      "What is your favorite color?",
      new anchor.BN(0),
      new anchor.BN(1853386634),
    ).rpc()
  });
});
