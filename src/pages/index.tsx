import React from "react";
import dynamic from "next/dynamic";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import fs from "fs";
import { promisify } from "util";
import Head from "next/head";
const Slider = dynamic(() => import("../components/Slider/Slider"), { ssr: false });

export type IndexProps = InferGetStaticPropsType<typeof getStaticProps>;

const Index = ({ cards }: IndexProps) => {
	return (
    <>
      <Head>
        <title>Slider test</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div >
        <main >
        <div className="container">
        <h1 className="title is-2">
          The slider below has a lot of mistakes. Try your best and fix them.
        </h1>
        </div>

          <Slider cards={cards} />

          <div className="container">
          <h2 className="title is-4">Some of the mistakes:</h2>
						<dl>
							<dt className="strike">
								<strong>Bad typescript usage</strong>
							</dt>
							<dd className="strike">
								As you can see, cards are of 2 types. Fix the Card component's props
								respectively to it. (no any, clean disjoint definition)
							</dd>
							<dt className="strike">
								<strong>
									Slider inherits margin/padding, so it doesn't show cards from edge
									to edge of the browser (it's ugly).
								</strong>
							</dt>
							<dd className="strike">
								It should be aligned with other content at initial rendering, but
								should display cards from edge to edge of the browser as the user
								scrolls. It should also be right-aligned with other content when
								user reaches the end of slider's content.
							</dd>
							<dt className="strike">
								<strong>
									Shadows of cards don't extend beyond the edges of the slider
								</strong>
							</dt>
							<dd className="strike">
								Shadows should be visible even outside of the slider component.
							</dd>
							<dt className="strike">
								<strong>
									Shadow of each card overlaps previous card (a keen eye sees!).
								</strong>
							</dt>
							<dd className="strike">
								Shadow of card should be "under" adjacent elements. And only if
								hovered, it should go over to seem more 3d-like.
							</dd>
							<dt className="strike">
								<strong>Cards in Safari have no gap between them.</strong>
							</dt>
							<dd className="strike">Gap should be the same in every modern browser.</dd>
							<dt>
								<strong>
									Scrollbar is ugly (and looks different in different browsers)
								</strong>
							</dt>
							<dd>
								It'd be better to have nice uniform (in modern browsers) scrollbar
								(design is up to you). Think about mouse countrolled and touch-only
								devices. Should the scrollbar be the same for both cases? If not,
								make it different.
							</dd>
							<dt>
								<strong>Not all users can scroll horizontally with mouse.</strong>
							</dt>
							<dd>
								It'd be nice to let users easily move the strip left or right using
								some buttons. Users with touch devices don't need them.
							</dd>
						</dl>
          </div>

        </main>
      </div>
    </>
  );
}



export const getStaticProps: GetStaticProps = async () => {
  const cards = (await promisify(fs.readFile)("public/cards.json")).toString(
    "utf-8"
  );

  return {
    props: {
      cards: JSON.parse(cards),
    },
  };
};

export default Index;
