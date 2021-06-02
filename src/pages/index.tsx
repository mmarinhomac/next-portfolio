import { GetStaticProps } from 'next';
import { Button, Flex, Grid, GridItem, Icon, Image, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import Head from 'next/head';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../services/prismic';

type Post = {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
}

interface PostsProps {
  posts: Post[]
}

export default function Home({ posts }: PostsProps) {
  const isMobileVersion = useBreakpointValue({
    base: true,
    md: true,
    lg: false,
  });

  const isTabletVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: false,
  });

  function handleScrollSmooth() {
    let i = 0;
    let frame;
    function anime() {
      i = (i + 1) * 1.12; // Speed
      window.scrollTo(0, i);
      frame = window.requestAnimationFrame(anime);
      if (i >= window.innerHeight) {
        cancelAnimationFrame(frame);
      }
    }

    window.requestAnimationFrame(anime);
  }

  return (
    <Flex
      direction="column"
      overflow="hidden"
    >
      <Head>
        <title>Personal Portfolio | marinhomac</title>
      </Head>

      <Flex
        as="section"
        bgImage="images/bg.png"
        bgSize="cover"
        bgPosition="center"
        w="100vw"
        h="100vh"
        align="center"
        paddingInline={["10", "16", "28"]}
      >
        <Stack spacing="4" position="relative">
          <Stack spacing={["0", "-1", "-2"]}>
            <Text letterSpacing="0.5px" color="white" fontWeight="300" fontSize={["xl", "3xl", "3xl"]}>✌ Hey, welcome to my</Text>
            <Text letterSpacing="0.5px" color="white" fontWeight="700" fontSize={["5xl", "7xl", "7xl"]}>PORTFOLIO</Text>
          </Stack>

          <Stack direction="row" spacing={["4", "4", "5"]}>
            <Button
              as="a"
              href="resume_es.pdf"
              target="_blank"
              color="white"
              border="2px"
              borderRadius="4px"
              paddingInline={["5", "8", "10"]}
              paddingBlock={["3", "4", "5"]}
              bg="transparent"
              _hover={{
                bgColor: 'gray.300',
                borderColor: 'gray.300',
                color: 'gray.900',
                transform: 'scale(1.1, 1.1)'
              }}
            >
              <Text fontSize={["sm", "md", "md"]} letterSpacing="0.5px">RESUME</Text>
            </Button>
            <Button
              color="gray.900"
              border="2px"
              borderColor="white"
              bg="white"
              borderRadius="4px"
              paddingInline={["5", "8", "10"]}
              paddingBlock={["3", "4", "5"]}
              _hover={{
                bgColor: 'gray.300',
                borderColor: 'gray.300',
                transform: 'scale(1.1, 1.1)'
              }}
              onClick={handleScrollSmooth}
            >
              <Text fontSize={["sm", "md", "md"]} letterSpacing="0.5px">EXPERIENCE</Text>
              <Icon as={RiArrowDropDownLine} fontSize={["20", "28", "38"]} marginRight={["-2", "-3", "-4"]} />
            </Button>
          </Stack>

          <Flex position="absolute" top="72" direction="column">
            <Text fontSize={["sm", "md", "xl"]} letterSpacing="0.5px" color="white" fontWeight="600">Whose art is this?</Text>
            <Text as="a" href="https://dribbble.com/romanklco" target="_blank" fontSize={["sm", "md", "xl"]} letterSpacing="0.5px" color="#D2B200" fontWeight="300">Roman Klčo</Text>
          </Flex>
        </Stack>

      </Flex>

      <Flex
        as="section"
        direction="column"
        align="center"
        paddingBottom="20"
      >
        <Text mt="24" letterSpacing="4px" fontSize={["xl", "2xl", "2xl"]}>EXPERIENCE 👏</Text>
        <Flex
          mt="24"
          paddingInline={["8", "12", "44"]}
          w="100%"
          alignItems="center"
          justify={isMobileVersion ? 'center' : 'space-between'}
          bg="purple.50"
          paddingBlock="8"
          direction={isMobileVersion ? 'column' : 'row'}
        >
          <Stack align="center" w={["auto", "auto", "2xl"]} spacing="4">
            <Text letterSpacing="0.5px" textAlign="center" fontWeight="600" fontSize={["sm", "md", "md"]}>SERVER SIDE RENDERING</Text>
            <Image src="images/nextjs.svg" w="16" h="16" />
          </Stack>
          <Stack align="center" w={["auto", "auto", "2xl"]} spacing="4">
            <Text letterSpacing="0.5px" textAlign="center" fontWeight="600" fontSize={["sm", "md", "md"]} mt={isMobileVersion ? '10' : '0'}>INTERFACE APPLICATIONS</Text>
            <Image src="images/reactjs.svg" w="16" h="16" />
          </Stack>
          <Stack align="center" w={["auto", "auto", "2xl"]} spacing="4">
            <Text letterSpacing="0.5px" textAlign="center" fontWeight="600" fontSize={["sm", "md", "md"]} mt={isMobileVersion ? '10' : '0'}>REST API / CRAWLERS / INTEGRATIONS</Text>
            <Image src="images/nodejs.svg" w="16" h="16" />
          </Stack>
        </Flex>
        <Text mt="24" letterSpacing="4px" fontSize={["xl", "2xl", "2xl"]}>REACT CLONE 😍</Text>

        <Grid
          w={
            isTabletVersion ? "88vw" : `${isMobileVersion ? "100vw" : "78vw"}`
          }
          templateColumns={
            isTabletVersion ? "repeat(2, 1fr)" : `${isMobileVersion ? "repeat(1, 1fr)" : "repeat(3, 1fr)"}`
          }
          gap={[10, 10, 10]}
          mt="24"
        >
          {posts.map(post => (
            <GridItem key={post.slug}>
              <Flex 
                width="100%" 
                height="80" 
                backgroundImage={post.image} 
                backgroundSize="cover" 
                backgroundPosition="center" 
                borderRadius={["0", "0", "14"]} 
              />
              <Stack mt="4" spacing="0" pl={["8", "8", "0"]}>
                <Text fontSize={["md", "md", "xl"]} fontWeight="700">{post.title}</Text>
                <Text fontSize={["sm", "sm", "md"]} fontWeight="italic">{post.subtitle}</Text>
              </Stack>
            </GridItem>
          ))}
        </Grid>
      </Flex>

      <Flex
        bg="purple.50"
        w="100vw"
        h="16"
        align="center"
        justify="center"
        paddingInline="10"
      >
        <Text textAlign="center" fontSize={["sm", "md", "md"]}>© 2021 Made with 💖 by <Text as="span" fontWeight="600">marinhomac</Text></Text>
      </Flex>
    </Flex>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'post')
  ], {
    fetch: ['post.title', 'post.subtitle', 'post.image'],
    pageSize: 100,
  })

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      subtitle: RichText.asText(post.data.subtitle),
      image: post.data.image.url
    };
  })

  return {
    props: {
      posts
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}