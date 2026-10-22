import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto, PatchPostDto } from './posts.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-options.entity';
import { TagsService } from 'src/tags/tags.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly userService: UserService,
    private readonly tagsService: TagsService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}

  async findAllPosts(userId: string) {
    console.log(userId);
    // const user = this.userService.findById(parseInt(userId));
    // console.log(user);
    // return {
    //   user,
    //   posts: POSTS.filter((post) => post.userId === parseInt(userId)),
    // };
    const posts = await this.postRepository.find({});
    return posts;
  }

  async createPost(postData: CreatePostDto) {
    console.log({ postData });
    // these are commented after adding cascade option to OneToOne relation
    // create meta options
    // let metaOptions = postData.metaOptions
    //   ? this.metaOptionRepository.create(postData.metaOptions)
    //   : null;

    // if (metaOptions) {
    //   metaOptions = await this.metaOptionRepository.save(metaOptions);
    // }

    const tags = await this.tagsService.findMultipleTagsByIds(postData.tags);

    const author = await this.userService.findById(postData.authorId);
    if (!author) {
      throw new BadRequestException('Author do not exists for given authorId');
    }

    // create post
    let post = this.postRepository.create({
      ...postData,
      author,
      tags,
    });
    // add meta options to the post
    // if (metaOptions) {
    //   post.metaOptions = metaOptions;
    // }

    post = await this.postRepository.save(post);

    return post;
  }

  async deletePost(postId: number) {
    // all of this code is with uni-directional
    // const foundPost = await this.postRepository.findOneBy({
    //   id: postId,
    // });
    // if (!foundPost) {
    //   throw new BadRequestException('Id passed is not valid');
    // }

    // await this.postRepository.delete(postId);
    // console.log('post is deleted');
    // await this.metaOptionRepository.delete(foundPost.metaOptions.id);
    // console.log('meta options is deleted');
    // await this.postRepository.softDelete();
    await this.postRepository.delete(postId);
    return { deleted: true, id: postId };
  }

  async update(patchPost: PatchPostDto) {
    const tagIds = patchPost.tags;
    const postId = patchPost.id;
    const tags = await this.tagsService.findMultipleTagsByIds(tagIds);
    let post = await this.postRepository.findOneBy({
      id: postId,
    });

    post = {
      ...post,
      tags: [...post.tags, ...tags],
    };

    const updatedPost = await this.postRepository.save(post);
    return updatedPost;
  }
}
